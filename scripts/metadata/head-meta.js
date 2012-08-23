MetaParser.createFormat('Meta', {
  syntax: 'head-meta',
  base: 'html',
  properties: function(scope){
    return scope.find('head').find('title, meta[name], link[rel=meta], link[rel=alternate]');
  },
  propertyKeys: function(property){
    if(property.is('title')){
      return 'title'
    }
    if(property.is('link')){
      return property.attr('rel')
    }
    return property.attr('name');
  },
  propertyValue: function(property){
    if(property.is('meta')){
      return property.attr('content')
    }
    if(property.is('link')){
      return property.attr('href')
    }

    return property.text();
  },
  getEntityType: function(item){
    return 'meta';
  }
})
