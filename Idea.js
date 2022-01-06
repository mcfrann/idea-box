class Idea {
  constructor(title, body){
    this.title = title;
    this.id = Date.now();
    this.body = body;
    this.star = false;
  }
  updateIdea() {
    if (!this.star){
      this.star = true
    } else {
      this.star = false
    }
  }
}
