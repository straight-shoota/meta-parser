MetaParser = function(){
  this.initialize();
}
MetaParser.create = function(properties, parent){
  var klass = function(){
    this.initialize();
  }
  $.extend(klass.prototype, MetaParser.prototype);
  if(parent){
    $.extend(klass.prototype, parent)
  }
  $.extend(klass.prototype, properties);

  return klass;
}
MetaParser.Formats = {}
MetaParser.createFormat = function(name, properties, parent){
  var format = MetaParser.create(properties, parent);
  MetaParser.Formats[name] = format;
  MetaParser[name] = format;
}
MetaParser.getEntities = function(root){
  entities = [];
  for(i in this.Formats){
    var format = new this.Formats[i]();
    //console.log("items:", format.getItems(root))
    $.each(format.getItems(root), function(){
      console.log("entity:", this)
      entities.push(format.getEntity(this))
    });
  }
  return entities;
}

MetaParser.prototype = {
  initialize: function(){
    //console.log(this)
  },
  get: function(fun, elem){
    //console.log(fun, elem, this[fun])
    if(typeof this[fun] == 'function'){
      return this[fun](elem);
    }
    return elem.find(this[fun]);
  },
  getItems: function(root){
    if(! root){
      root = document;
    }
    return this.get('base', root)
  },
  getProperties: function(item){
    return this.get('properties', item)
  },
  getEntity: function(item){
    item = $(item)
    if(item.data('entity-' + this.syntax)){
      return false;
    }

    /*if(item.length){
      item = item[0]
    }*/
    var entity = new Entity(this.syntax)
    item.data('entity-' + this.syntax,  entity)

    entity.type = this.getEntityType(item);
    entity.id = this.getEntityId(item);
    if(typeof this.initEntity == 'function'){
      this.initEntity(entity, item);
    }
    console.log("getEntity", this, item, this.getProperties(item))
    _this = this
    p=this.getProperties(item);
    console.log(p)
    p.each(function(){
      entity.add(_this.getPropertyKeys($(this)), _this.getPropertyValue($(this)))
    })
    console.log(entity)
    return entity;
  },
  getEntityId: function(item){
    return undefined;
  },
  getEntityType: function(item){
    return undefined;
  },
  getPropertyKeys: function(item){
    return this.get('propertyKeys', item)
  },
  getPropertyValue: function(item){
    return this.get('propertyValue', item)
  },
  getDefaultPropertyValue: function(elem){
    if(elem.is('audio, embed, iframe, img, source, video')){
      return elem.attr('src')
    }
    if(elem.is('a, area, link')){
      return elem.attr('href')
    }
    if(elem.is('object')){
      return elem.attr('data')
    }
    if(elem.is('time[datetime]')){
      return elem.attr('datetime')
    }
    return elem.text()
  }
}
