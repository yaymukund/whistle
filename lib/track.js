var Track = module.exports = {};

Track.create = function(json) {
  var track = Object.create(this);

  track.url = json.url;
  track.currentTime = 0;

  return track;
};
