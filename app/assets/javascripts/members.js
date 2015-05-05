var Members = function(elem) {
  this.elem = elem;
  this.memberList = {};
};

Members.prototype.addMember = function(member) {
  console.log("Adding a new member.");

  if (this.memberList[member.id]) {
    return;
  }

  this.memberList[member.id] = member;
  this.createHTML();
};

Members.prototype.removeMember = function(id) {
  console.log("Removing member with id: " + id);

  if (this.memberList[id]) {
    delete this.memberList[id];
    this.createHTML();
  }
};

Members.prototype.createHTML = function() {
  console.log("Rendering members HTML");

  this.elem.empty();

  $.each(this.memberList, function(ndx, member) {
    var memberHTML = '<span class="selected-member" data-member-id="' + member.id + '">'
        + '<button class="btn btn-default" style="margin: 3px;" onclick="mem.removeMember(' + member.id + ');">'
          + member.value
        + '</button>'
        + '</span>'
        + '<br />';

    elem.append(memberHTML);
  });
};
