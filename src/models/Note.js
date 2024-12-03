export class Note {
  constructor(data) {
    this.title = data.title;
    this.description = data.description || '';
    this.color = data.color;
    this.createdAt = data.createdAt === undefined ? new Date() : new Date(data.createdAt);
    this.updatedAt = data.updatedAt === undefined ? new Date() : new Date(data.updatedAt);
  }
}
