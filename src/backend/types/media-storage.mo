import Storage "mo:caffeineai-object-storage/Storage";
import CommonTypes "common";

module {
  public type UserId = CommonTypes.UserId;
  public type Timestamp = CommonTypes.Timestamp;
  public type FileId = CommonTypes.FileId;

  public type FileCategory = {
    #document;
    #image;
    #video;
    #audio;
  };

  public type SortField = {
    #uploadDate;
    #fileSize;
    #name;
  };

  public type SortOrder = {
    #asc;
    #desc;
  };

  public type FileRecord = {
    id : FileId;
    ownerId : UserId;
    name : Text;
    mimeType : Text;
    fileSize : Nat;
    blob : Storage.ExternalBlob;
    uploadedAt : Timestamp;
    category : FileCategory;
  };

  public type FileMetadata = {
    id : FileId;
    name : Text;
    mimeType : Text;
    fileSize : Nat;
    uploadedAt : Timestamp;
    category : FileCategory;
  };

  public type ListFilesRequest = {
    page : Nat;
    pageSize : Nat;
    category : ?FileCategory;
    searchQuery : ?Text;
    sortField : SortField;
    sortOrder : SortOrder;
  };

  public type ListFilesResponse = {
    files : [FileMetadata];
    totalCount : Nat;
    page : Nat;
    pageSize : Nat;
  };

  public type StorageStats = {
    totalFiles : Nat;
    totalBytes : Nat;
    documentCount : Nat;
    imageCount : Nat;
    videoCount : Nat;
    audioCount : Nat;
  };

  public type UploadResult = {
    #ok : FileMetadata;
    #err : Text;
  };

  public type DeleteResult = {
    #ok;
    #err : Text;
  };

  public type RenameResult = {
    #ok : FileMetadata;
    #err : Text;
  };
};
