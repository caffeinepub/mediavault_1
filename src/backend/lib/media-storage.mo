import Types "../types/media-storage";
import List "mo:core/List";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Principal "mo:core/Principal";

module {
  /// Determine file category from MIME type
  public func categoryFromMime(mimeType : Text) : Types.FileCategory {
    let lower = mimeType.toLower();
    if (
      lower.startsWith(#text "image/")
    ) {
      #image;
    } else if (
      lower.startsWith(#text "video/")
    ) {
      #video;
    } else if (
      lower.startsWith(#text "audio/")
    ) {
      #audio;
    } else {
      #document;
    };
  };

  /// Convert a FileRecord to its shareable FileMetadata
  public func toMetadata(file : Types.FileRecord) : Types.FileMetadata {
    {
      id = file.id;
      name = file.name;
      mimeType = file.mimeType;
      fileSize = file.fileSize;
      uploadedAt = file.uploadedAt;
      category = file.category;
    };
  };

  /// Filter files by owner, optional category, and optional search query
  public func filterFiles(
    files : List.List<Types.FileRecord>,
    ownerId : Types.UserId,
    category : ?Types.FileCategory,
    searchQuery : ?Text,
  ) : List.List<Types.FileRecord> {
    files.filter<Types.FileRecord>(func(file) {
      if (not Principal.equal(file.ownerId, ownerId)) {
        return false;
      };
      switch (category) {
        case (?cat) {
          if (file.category != cat) { return false };
        };
        case null {};
      };
      switch (searchQuery) {
        case (?q) {
          let lowerName = file.name.toLower();
          let lowerQ = q.toLower();
          if (not lowerName.contains(#text lowerQ)) {
            return false;
          };
        };
        case null {};
      };
      true;
    });
  };

  /// Sort files by the given field and order
  public func sortFiles(
    files : List.List<Types.FileRecord>,
    sortField : Types.SortField,
    sortOrder : Types.SortOrder,
  ) : List.List<Types.FileRecord> {
    let compareFunc : (Types.FileRecord, Types.FileRecord) -> { #less; #equal; #greater } = switch sortField {
      case (#uploadDate) {
        func(a, b) {
          let ord = Int.compare(a.uploadedAt, b.uploadedAt);
          switch sortOrder {
            case (#asc) ord;
            case (#desc) switch ord {
              case (#less) #greater;
              case (#greater) #less;
              case (#equal) #equal;
            };
          };
        };
      };
      case (#fileSize) {
        func(a, b) {
          let ord = Nat.compare(a.fileSize, b.fileSize);
          switch sortOrder {
            case (#asc) ord;
            case (#desc) switch ord {
              case (#less) #greater;
              case (#greater) #less;
              case (#equal) #equal;
            };
          };
        };
      };
      case (#name) {
        func(a, b) {
          let ord = Text.compare(a.name.toLower(), b.name.toLower());
          switch sortOrder {
            case (#asc) ord;
            case (#desc) switch ord {
              case (#less) #greater;
              case (#greater) #less;
              case (#equal) #equal;
            };
          };
        };
      };
    };
    files.sort<Types.FileRecord>(compareFunc);
  };

  /// Return a page of files as an immutable array
  public func paginateFiles(
    files : List.List<Types.FileRecord>,
    page : Nat,
    pageSize : Nat,
  ) : [Types.FileRecord] {
    let total = files.size();
    if (pageSize == 0 or total == 0) { return [] };
    let start : Nat = page * pageSize;
    if (start >= total) { return [] };
    let endNat : Nat = Nat.min(start + pageSize, total);
    files.sliceToArray<Types.FileRecord>(start, endNat);
  };

  /// Compute storage statistics for a specific owner
  public func getStorageStats(
    files : List.List<Types.FileRecord>,
    ownerId : Types.UserId,
  ) : Types.StorageStats {
    files.foldLeft<Types.StorageStats, Types.FileRecord>(
      { totalFiles = 0; totalBytes = 0; documentCount = 0; imageCount = 0; videoCount = 0; audioCount = 0 },
      func(acc, file) {
        if (not Principal.equal(file.ownerId, ownerId)) { return acc };
        let docDelta = if (file.category == #document) 1 else 0;
        let imgDelta = if (file.category == #image) 1 else 0;
        let vidDelta = if (file.category == #video) 1 else 0;
        let audDelta = if (file.category == #audio) 1 else 0;
        {
          totalFiles = acc.totalFiles + 1;
          totalBytes = acc.totalBytes + file.fileSize;
          documentCount = acc.documentCount + docDelta;
          imageCount = acc.imageCount + imgDelta;
          videoCount = acc.videoCount + vidDelta;
          audioCount = acc.audioCount + audDelta;
        };
      },
    );
  };

  /// Generate a unique file ID using current time and a counter seed
  public func generateFileId(counter : Nat) : Types.FileId {
    let t = Time.now();
    "f-" # t.toText() # "-" # counter.toText();
  };
};
