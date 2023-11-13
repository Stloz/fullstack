class Post {
  static #list = [] //сюди запусуються пости
  static #count = 1 //для створення унікального ідентифікатора

  //конструктор приймає  username (імя користувача) та text (текст посту який він створив)
  constructor(username, text) {
    this.id = Post.#count++

    this.username = username
    this.text = text
    this.date = new Date().getTime() //створюємо дату в форматі мілісекунди в потім на фронт частині передворимо її в норм дату

    this.reply = [] // сюди будуть записуватись пости-коментарі
  }

  static create(username, text, post) {
    const newPost = new Post(username, text)

    if (post) {
      post.reply.push(newPost)

      console.log(post)
    } else {
      this.#list.push(newPost)
    }

    // console.log(this.#list)
    return newPost
  }

  static getById(id) {
    return (
      this.#list.find((item) => item.id === Number(id)) ||
      null
    )
  }

  static getList = () => this.#list
}

module.exports = { Post }
