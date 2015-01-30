import DS from "ember-data";
import mura from 'mura/mura';

export default DS.Adapter.extend({
  
  findBelongsTo: function(store, record, url) {
    return this.findHasMany(store,record,url);
  },

  findHasMany: function(store, record, url) {
    return this.processRequest(url,{},'GET');
  },   

  createRecord: function(store, type, record) {
    var data = this.serialize(record, { includeId: true });
    var url = mura.apiEndpoint + "?method=save&siteid=" + mura.siteid;
    data.entityName=type.toString().split(':')[1];

    $.ajax({
      url: mura.apiEndpoint + "?method=generateCSRFTokens&siteid=" + mura.siteid + "&context=" + data.id + "&cacheid=" + Math.random(),
      async: false,
      success: function(tokens){
       /*
        if(typeof tokens === 'object'){
          var jtokens=tokens;
        } else {
          var jtokens=eval('(' + tokens + ')');
        }

        data['csrf_token']=jtokens.data.csrf_token;
        data['csrf_token_expires']=jtokens.data.csrf_token_expires;
        */
      }
    });

    return this.processRequest(url,data,'POST');
    
  },

  updateRecord: function(store, type, record) {
    var data = this.serialize(record, { includeId: true });
    var id = record.get('id');
    var url = mura.apiEndpoint + "?method=save&siteid=" + mura.siteid;

    data.entityName=type.toString().split(':')[1];

     $.ajax({
      url: mura.apiEndpoint + "?method=generateCSRFTokens&siteid=" + mura.siteid + "&context=" + data.id + "&cacheid=" + Math.random(),
      async: false,
      /*
      success: function(tokens){
        if(typeof tokens === 'object'){
          var jtokens=tokens;
        } else {
          var jtokens=eval('(' + tokens + ')');
        }

        data['csrf_token']=jtokens.data.csrf_token;
        data['csrf_token_expires']=jtokens.data.csrf_token_expires;
      }
      */
    });

    return this.processRequest(url,data,'POST');
  },

  deleteRecord: function(store, type, record) {
    var data = this.serialize(record, { includeId: true });
    var id = record.get('id');
    var url = mura.apiEndpoint + "?method=delete&siteid=" + mura.siteid;

    data.entityName=type.toString().split(':')[1];

     $.ajax({
      url: mura.apiEndpoint + "?method=generateCSRFTokens&siteid=" + mura.siteid + "&context=" + data.id + "&cacheid=" + Math.random(),
      async: false,
      success: function(tokens){
        /*
        if(typeof tokens === 'object'){
          var jtokens=tokens;
        } else {
          var jtokens=eval('(' + tokens + ')');
        }

        data['csrf_token']=jtokens.data.csrf_token;
        data['csrf_token_expires']=jtokens.data.csrf_token_expires;
        */
      }
    });

    return this.processRequest(url,data,'POST');
  },

  find: function(store, type, id) {
    var url = mura.apiEndpoint + "?method=findOne&siteid=" + mura.siteid;
    var data={entityName:type.toString().split(':')[1], id:id};
    return this.processRequest(url,data,'GET');
  },

  findMany: function(store, type, ids) {
    var url = mura.apiEndpoint + "?method=findMany&siteid=" + mura.siteid;
    var data={entityName:type.toString().split(':')[1], ids:ids};
    return this.processRequest(url,data,'GET');
  },

  findAll: function(store, type, sinceToken) {
    var url = mura.apiEndpoint + "?method=findAll&siteid=" + mura.siteid;
    var query = { since: sinceToken, entityName:type.toString().split(':')[1]};
    
    return this.processRequest(url,query,'GET');
  },

  findQuery: function(store, type, query) {
    var url = mura.apiEndpoint + "?method=findQuery&siteid=" + mura.siteid;
    
    query.entityName=type.toString().split(':')[1];

    return this.processRequest(url,query,'GET');
  },

  processRequest: function(url,data, type){

    return new Ember.RSVP.Promise(function(resolve, reject) {
      $.ajax({
        type: type,
        url: url,
        dataType: 'json',
        data: data
      }).then(function(data) {

        /*
        if(typeof data === 'string' && data !==''){
          data=eval("(" + data + ")");
        }
        */
        
        data=data.data;

        if(typeof data === 'object' && 'redirect' in data){
          location.href=resp.data.redirect;
        } else {
          if(typeof data === 'object' && 'items' in data){
            data=data.items;
          }

          Ember.run(null, resolve, data);
        }
      }, function(jqXHR) {
        jqXHR.then = null; // tame jQuery's ill mannered promises
        Ember.run(null, reject, jqXHR);
      });
    });
  },

  generateIdForRecord: function() {
    var s = [], itoh = '0123456789ABCDEF';
    var i;
    // Make array of random hex digits. The UUID only has 32 digits in it, but we
    // allocate an extra items to make room for the '-'s we'll be inserting.
    for (i = 0; i < 35; i++) s[i] = Math.floor(Math.random()*0x10);
   
    // Conform to RFC-4122, section 4.4
    s[14] = 4;  // Set 4 high bits of time_high field to version
    s[19] = (s[19] & 0x3) | 0x8;  // Specify 2 high bits of clock sequence
   
    // Convert to hex chars
    for (i = 0; i < 36; i++) s[i] = itoh[s[i]];
   
    // Insert '-'s
    s[8] = s[13] = s[18] = '-';
   
    return s.join('');
  }
  
});