var Members = function(elem) {
  this.elem = elem;
  this.memberList = {};
};

Members.prototype.addMember = function(member) {
  console.log("Adding a new member.");

  if (this.members[member.id]) {
    return;
  }

  this.members[member.id] = member;
  this.createHTML();
};

Members.prototype.removeMember = function(id) {
  console.log("Removing member with id: " + id);

  if (this.members[id]) {
    delete this.members[id];
    this.createHTML();
  }
};

Members.prototype.createHTML = function() {
  console.log("Rendering members HTML");

  this.elem.empty();

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
