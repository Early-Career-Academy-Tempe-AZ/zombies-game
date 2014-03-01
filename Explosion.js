/* global Entity */
(function () {
  'use strict';

  function Explosion(x, y) {
    this.base = Entity;
    this.base(
      x,
      y,
      32,
      52,
      'public/images/sprites/fireball2.png',
      [[0, 7], [32, 7], [64, 7], [96, 7]],
      50,
      0
    );
  }

  Explosion.prototype = new Entity();
  Explosion.prototype.constructor = Explosion;

  // Make Explosion globally available
  window.Explosion = Explosion;
}());
