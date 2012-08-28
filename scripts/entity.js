Entity = function(syntax){
  this.properties = {}
  this.syntax = syntax
}
$.extend(Entity.prototype, {
  add: function(name, val){
    if($.isArray(name)){
      for(i in name){
        this.add(name[i], val);
      }
      return;
    }
    if(! this.properties[name]){
      this.properties[name] = []
    }
    this.properties[name].push(val)
  },
  inspect: function(){
    var s = '<table class="entity" data-entity-format="'
      s += this.syntax +'" data-entity-type="' + this.type + '">'
    s += '<thead><tr><td colspan="2">';
    if(this.id){
      s += '<span class="entity-id">'
      s += this.id
      s += '</span>'
    }
    s += '<span class="entity-type">'
    if(this.type){
      s += ' ['
      s += this.type
      s += ']'
    }else{
      s += '[?]'
    }
    s += '</span>'
    s += '</td></tr></thead>'
    s += '<tbody>'
    function val(prop){
      return ((typeof prop.inspect == "function") ? prop.inspect() : prop)
    };
    $.each(this.properties, function(key, values){
      s += '<tr>';
      s += '<th rowspan="' + values.length + '">' + key + '</th>'
        var first = true
        $.each(values, function(i, value){
          if(!first){
            s += '</tr><tr>';
          }else{
            first = false;
          }
          s += '<td>' + val(value) + "</td>"
        })
      s += '</tr>';
    })
    s += '</tbody>'
    s += '</table>'
    return s
  }
})
