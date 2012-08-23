Entity = function(syntax){
  this.properties = {}
  this.syntax = syntax
}
$.extend(Entity.prototype, {
  add: function(name, val){
    //console.log(name, val)
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
    s = '<table class="entity" data-entity-format="' + this.syntax +'" data-entity-type="' + this.type + '">'
    s += '<thead><tr><td colspan="2">';
    //s += this.syntax;
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
    /*function kv(k,v){
      s += '<tr><th>' + k + '</th><td>' + v + '</td></tr>'
    }
    if(this.type){
      kv('type', this.type)
    }
    if(this.id){
      kv('id', this.id)
    }
    s += '<tr class="head"><td colspan="2">'
    s += 'properties'
    s += '</td></tr>'*/
    $.each(this.properties, function(key, values){
      s += '<tr>';
      s += '<th rowspan="' + values.length + '">' + key + '</th>'
      //s += '<td>'
      //if(this.properties[key].length == 1){
      //  s += val(this.properties[key][0]);
      //}else{
      //  s+= "<ul>"
        var first = true
        $.each(values, function(i, value){
      //    s += '<li>' + val(this.properties[key][i]) + "</li>"
          if(!first){
            s += '</tr><tr>';
          }else{
            first = false;
          }
          s += '<td>' + val(value) + "</td>"
        })
      //  s+="</ul>"
      //}
      //s +='</td>'
      s += '</tr>';
    })
    s += '</tbody>'
    s += '</table>'
    return s
  }
})
