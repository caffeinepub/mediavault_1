import Types "../types/media-storage";
import MediaLib "../lib/media-storage";
import Storage "mo:caffeineai-object-storage/Storage";
import List "mo:core/List";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Time "mo:core/Time";

mixin (files : List.List<Types.FileRecord>) {
  var fileCounter : Nat = 0;

  /// Upload a new file and register its metadata
  public shared ({ caller }) func uploadFile(
    name : Text,
    mimeType : Text,
    fileSize : Nat,
    blob : Storage.ExternalBlob,
  ) : async Types.UploadResult {
    if (caller.isAnonymous()) {
      return #err "Authentication required";
    };
    let category = MediaLib.categoryFromMime(mimeType);
    fileCounter += 1;
    let fileId = MediaLib.generateFileId(fileCounter);
    let record : Types.FileRecord = {
      id = fileId;
      ownerId = caller;
      name = name;
      mimeType = mimeType;
      fileSize = fileSize;
      blob = blob;
      uploadedAt = Time.now();
      category = category;
    };
    files.add(record);
    #ok(MediaLib.toMetadata(record));
  };

  /// List files for the caller with optional filtering, sorting, and pagination
  public shared query ({ caller }) func listFiles(
    request : Types.ListFilesRequest,
  ) : async Types.ListFilesResponse {
    let filtered = MediaLib.filterFiles(files, caller, request.category, request.searchQuery);
    let sorted = MediaLib.sortFiles(filtered, request.sortField, request.sortOrder);
    let totalCount = sorted.size();
    let pageItems = MediaLib.paginateFiles(sorted, request.page, request.pageSize);
    let metaItems = pageItems.map(MediaLib.toMetadata);
    {
      files = metaItems;
      totalCount = totalCount;
      page = request.page;
      pageSize = request.pageSize;
    };
  };

  /// Get metadata for a single file owned by the caller
  public shared query ({ caller }) func getFileMetadata(
    fileId : Types.FileId,
  ) : async ?Types.FileMetadata {
    switch (files.find<Types.FileRecord>(func(f) { f.id == fileId and Principal.equal(f.ownerId, caller) })) {
      case (?file) ?MediaLib.toMetadata(file);
      case null null;
    };
  };

  /// Delete a file owned by the caller
  public shared ({ caller }) func deleteFile(
    fileId : Types.FileId,
  ) : async Types.DeleteResult {
    if (caller.isAnonymous()) {
      return #err "Authentication required";
    };
    let sizeBefore = files.size();
    files.retain<Types.FileRecord>(func(f) {
      not (f.id == fileId and Principal.equal(f.ownerId, caller))
    });
    let sizeAfter = files.size();
    if (sizeAfter == sizeBefore) {
      return #err "File not found or access denied";
    };
    #ok;
  };

  /// Rename a file owned by the caller
  public shared ({ caller }) func renameFile(
    fileId : Types.FileId,
    newName : Text,
  ) : async Types.RenameResult {
    if (caller.isAnonymous()) {
      return #err "Authentication required";
    };
    var updatedMeta : ?Types.FileMetadata = null;
    files.mapInPlace<Types.FileRecord>(func(f) {
      if (f.id == fileId and Principal.equal(f.ownerId, caller)) {
        let updated = { f with name = newName };
        updatedMeta := ?MediaLib.toMetadata(updated);
        updated;
      } else {
        f;
      };
    });
    switch (updatedMeta) {
      case (?meta) #ok(meta);
      case null #err "File not found or access denied";
    };
  };

  /// Get storage usage statistics for the caller
  public shared query ({ caller }) func getStorageStats() : async Types.StorageStats {
    MediaLib.getStorageStats(files, caller);
  };
};
