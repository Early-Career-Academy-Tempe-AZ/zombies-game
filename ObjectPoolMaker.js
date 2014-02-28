(function () {
  'use strict';

  function ObjectPoolMaker(Constructor, size) {
    var objectPool = [],
        marker = 0,
        poolSize = size || 0;

    if (poolSize) {
      expandPool(poolSize);
    }

    function expandPool(newSize) {
      var i;

      for (i = 0; i < newSize - poolSize; i++) {
        objectPool.push(new Constructor());
      }

      poolSize = newSize;
    }

    return {
      create: function () {
        if (marker >= poolSize) {
          expandPool(poolSize * 2);
        }

        var obj = objectPool[marker];
        obj.index = marker;
        marker += 1;
        obj.constructor.apply(obj, arguments);

        return obj;
      },

      destroy: function (obj) {
        marker -= 1;

        var lastObj = objectPool[marker],
            lastObjIndex = lastObj.index;

        objectPool[marker] = obj;
        objectPool[obj.index] = lastObj;

        lastObj.index = obj.index;
        obj.index = lastObjIndex;
      }

    };
  }


  // make ObjectPoolMaker available globally
  window.ObjectPoolMaker = ObjectPoolMaker;
}());
