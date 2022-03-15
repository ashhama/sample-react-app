class MenuItem {
  id: string;
  title: string;
  href: string;

  constructor(title: string, href: string) {
    this.id = new Date().toISOString();
    this.title = title;
    this.href = href;
  }
}

export default MenuItem;
