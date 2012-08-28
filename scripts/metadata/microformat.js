MetaParser.Microformat = {
  syntax: 'microformat',
  subProperties: {},
  properties: function(scope){
    return scope.find('.' + this.propertyNames.join(',.'))
      .not(scope.find(this.base).children())
  },
  propertyKeys: function(scope){
    result = $.grep(this.propertyNames, function(e){
      return $.inArray(e, scope[0].className.split(/\s+/)) > -1 })
    return result
  },
  propertyValue: function(property){
    for(klass in this.subProperties) {
      if(property.hasClass(klass)){
        return this.getSubPropertyValue(klass, property)
      }
    }
    return this.getDefaultPropertyValue(property)
  },
  getSubPropertyValue: function(sub, property){
    console.log("subproperties of: ", property)

    var properties = new MetaParser.Microformat.Properties(sub);
    _this = this
    $.each(this.subProperties[sub], function(i, name){
      console.log(name, property)
      property.find('.' + name).each(function(){
        properties.add(name, _this.getPropertyValue($(this)))
      })
    })
    if(properties.length == 0){
      // no substructures found
      return this.getDefaultPropertyValue(property);
    }
    console.log(properties)
    return properties;
  },
  getEntityType: function(item){
    return this.microformat;
  }
}
MetaParser.Microformat.Properties = function(sub){
  this.name = sub
  this.length = 0;
  this.properties = {}
}
MetaParser.Microformat.Properties.prototype = {
  add: function(name, val){
    if(! this.properties[name]){
      this.properties[name] = []
      this.length++;
    }
    this.properties[name].push(val)
  },
  inspect: function(){
    s = '<table class="sub-properties">'
    s += '<tbody>'
    function val(prop){
      return ((typeof prop.inspect == "function") ? prop.inspect() : prop)
    };
    for(key in this.properties){
      s += '<tr>';
      s += '<th rowspan="' + this.properties[key].length + '">' + key + '</th>'
        var first = true
        for(i in this.properties[key]){
          if(!first){
            s += '</tr><tr>';
          }else{
            first = false;
          }
          s += '<td>' + val(this.properties[key][i]) + "</td>"
        }
      s += '</tr>';
    }
    s += '</tbody>'
    s += '</table>'
    return s
  }
}
