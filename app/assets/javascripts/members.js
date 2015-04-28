var Members = function() {
  var constructor = function(elem) {
    this.elem = elem;
    this.members = {};

    this.addMember = function(member) {
      // make sure we don't already have this member
      if (this.members[member.id]) {
        return;
      }

      this.members[member.id] = member;
      this.createHTML();
    };

    this.removeMember = function(id) {
      if (this.members[id]) {
        this.members.delete(id);
        //this.members[id] = null;
        this.createHTML();
      }
    };

    /**
     * There's probably a better way to do the member removal instead of
     * overwriting the onclick and assuming there is a 'members' variable,
     * but my javascript-foo isn't good enough yet to do that.
     */
    this.createHTML = function() {
      // clear the existing list
      elem.empty();

      // re-add each member
      $.each(this.members, function(ndx, member) {
        var memberHTML = '<span class="selected-member" data-member-id="' + member.id + '">'
            + '<button class="btn btn-default">'
              + member.value + " "
              + '<a href="#" onclick="members.removeMember(' + member.id + '">'
                + '<span class="glyphicon glyphicon-remove">'
              + '</a>'
            + '</button>'
            + '</span>';

        elem.append(memberHTML);
      });
    };
  };
}();
