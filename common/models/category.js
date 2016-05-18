module.exports = function(Category) {

  function findCategoryIDByName(obj, cb){
    Category.findOne({
      where: {
        name: obj.name
      }
    }, function(err, data){
      if(err){
        cb(err);
      }else{
        cb(null, data.id);
      }
    });
  }

  Category.findCategoryIDByName = findCategoryIDByName;

  Category.remoteMethod(
    'findCategoryIDByName', {
      description: 'Find category by name',
      accepts: {
        arg: 'obj',
        type: 'object',
        http: {
          source: 'body'
        }
      },
      returns: {
        arg: 'data',
        type: 'number',
        root: true
      },
      http: {
        verb: 'post',
        path: '/findCategoryIDByName'
      }
    }
  );


};
