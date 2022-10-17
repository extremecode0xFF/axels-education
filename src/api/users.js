export class MockApi {
  static #url = 'https://mock-api.shpp.me/axels/users';

  static async getUsers() {
    try {
      const response = await fetch(this.#url);
      return response.json();
    } catch (error) {
      return error;
    }
  }
}
