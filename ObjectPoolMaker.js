(function () {
  'use strict';

  function ObjectPoolMaker(Constructor, size) {
    var objectPool = [],
        nextAvailableIndex = 0,
        poolSize = size || 1;

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
        if (nextAvailableIndex >= poolSize) {
          expandPool(poolSize * 2);
        }

        var obj = objectPool[nextAvailableIndex];
        obj.index = nextAvailableIndex;
        nextAvailableIndex += 1;
        obj.constructor.apply(obj, arguments);

        return obj;
      },

      destroy: function (obj) {
        nextAvailableIndex -= 1;

        var lastObj = objectPool[nextAvailableIndex],
            lastObjIndex = lastObj.index;

        objectPool[nextAvailableIndex] = obj;
        objectPool[obj.index] = lastObj;

        lastObj.index = obj.index;
        obj.index = lastObjIndex;
      }

    };
  }


  // make ObjectPoolMaker available globally
  window.ObjectPoolMaker = ObjectPoolMaker;
}());
