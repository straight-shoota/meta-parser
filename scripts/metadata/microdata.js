MetaParser.createFormat('Microdata', {
  syntax: 'microdata',
  base: '[itemscope]:not([itemprop])',
  properties: function(scope){
    return scope.find('[itemprop]')
      .not(scope.find('[itemscope]').children())
  },
  propertyKeys: function(property){
    return property.attr('itemprop').split(/ /)
  },
  propertyValue: function(property){
    if(property.attr('itemscope') !== undefined){
      return this.getEntity(property)
    }
    if(content = property.attr('content')){
      return content;
    }
    return this.getDefaultPropertyValue(property);
  },
  getEntityType: function(item){
    return item.attr('itemtype');
  },
  getEntityId: function(item){
    return item.attr('itemid');
  }
})
