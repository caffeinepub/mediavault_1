import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import MediaStorageMixin "mixins/media-storage-api";
import Types "types/media-storage";
import List "mo:core/List";

actor {
  let files = List.empty<Types.FileRecord>();

  include MixinObjectStorage();
  include MediaStorageMixin(files);
};
