MetaParser.createFormat('RDFa', {
  base: '[about], [typeof], html',
  syntax: 'rdfa',
  properties: function(scope){
    return scope.find('[property],[rel],[rev]').not(scope.find(this.base).children()).not(this.base).add(scope.filter('[property],[rel],[rev]'));
  },
  propertyKeys: function(elem){
    return $.trim([elem.attr('property'), elem.attr('rel'), elem.attr('rev')].join(' ')).split(/ +/)
  },
  propertyValue: function(property){
    if(content = property.attr('content')){
      return content;
    }
    if(resource = property.attr('resource')){
      return resource;
    }
    if(property.is(this.base)){
      if(entity = this.getEntity(property)){
        return entity;
      }
    }
    return this.getDefaultPropertyValue(property);
  },
  getEntityType: function(item){
    return item.attr('typeof');
  },
  getEntityId: function(item){
    return item.attr('about') || item.attr('src') || item.attr('typeof') || undefined;
  },
  initEntity: function(entity, elem){
    entity.vocab = elem.attr('vocab')
    var prefix = (elem.attr('prefix')||'').replace(/: +/g, '<>').split(/ /).map(function(v){return v.replace(/<>/, ': ')});
    if($.trim(prefix).length > 0){
      entity.add('#prefix', prefix)
    }
  }
})
