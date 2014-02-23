var Track = module.exports = {};

Track.create = function() {
  var track = Object.create(this);
  track.currentTime = 0;
  return track;
};
