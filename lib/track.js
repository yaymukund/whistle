var Track = module.exports = {};

Track.create = function(json) {
  var track = Object.create(this);

  track.title = json.title;
  track.id = json.id;
  track.url = json.url;
  track.fileType = json.file_type;
  track.addedAt = json.added_at;
  track.currentTime = 5;

  return track;
};
