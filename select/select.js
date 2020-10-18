const getTemplate = (placeholder, selectedId, data = []) => {
  let text = placeholder ?? "Выберите";

  const items = data.map((item) => {
    const cls = item.id === selectedId ? "selected" : "";
    if (item.id === selectedId) {
      text = item.value;
    }
    return `
      <li class="select__item ${cls}" data-type="item" data-id="${item.id}">${item.value}</li>
    `;
  });

  return `
    <div class="select__backdrop" data-type="backdrop"></div>
    <div class="select__input" data-type="input">
      <span data-type="value">${text}</span>
      <i class="fa" data-type="arrow"></i>
    </div>
    <div class="select__dropdown">
      <ul class="select__list">
        ${items.join("")}
      </ul>
    </div>
   `;
};

export class Select {
  constructor(selector, options) {
    this.$el = document.querySelector(selector);
    this.options = options;
    this.selectedId = null;

    this.#render();
    this.#setup();
  }

  #render() {
    this.$el.classList.add("select");
    const { placeholder, selectedId, data } = this.options;
    this.$el.innerHTML = getTemplate(placeholder, selectedId, data);
  }

  #setup() {
    this.handleClick = this.handleClick.bind(this);
    this.$el.addEventListener("click", this.handleClick);
    this.$arrow = this.$el.querySelector('[data-type="arrow"]');
    this.$arrow.classList.add("fa-chevron-down");
    this.$value = this.$el.querySelector('[data-type="value"]');
  }

  handleClick(event) {
    const { type } = event.target.dataset;
    if (type === "input") {
      this.toggle();
    } else if (type === "item") {
      this.select(event.target.dataset.id);
    } else if (type === "backdrop") {
      this.close();
    }
  }

  select(id) {
    this.selectedId = id;
    this.$value.textContent = this.current.value;

    this.$el.querySelectorAll('[data-type="item"]').forEach((el) => {
      el.classList.remove("selected");
    });
    this.$el.querySelector([`[data-id="${id}"]`]).classList.add("selected");

    this.options.onSelect ? this.options.onSelect(this.current) : null;

    this.close();
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  get isOpen() {
    return this.$el.classList.contains("open");
  }

  get current() {
    return this.options.data.find((item) => item.id === this.selectedId);
  }

  open() {
    this.$el.classList.add("open");
    this.$arrow.classList.add("fa-chevron-down");
    this.$arrow.classList.add("fa-chevron-up");
  }

  close() {
    this.$el.classList.remove("open");
    this.$arrow.classList.remove("fa-chevron-up");
    this.$arrow.classList.add("fa-chevron-down");
  }

  destroy() {
    this.$el.removeEventListener("click", this.handleClick);
    this.$el.innerHTML = "";
  }
}
