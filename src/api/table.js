export class MockApi {
  static #url = 'http://mock-api.shpp.me/espiridonov/users';

  static async getUsers() {
    try {
      const response = await fetch(this.#url);
      return response.json();
    } catch (error) {
      return error;
    }
  }
}
