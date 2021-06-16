class ApiService {
  baseURL: string;

  constructor() {
    this.baseURL =
      (process.env.NODE_ENV === "production"
        ? process.env.PUBLIC_URL
        : "http://localhost:5000") + "/api/v1/";
  }

  private getToken() {
    let token: string | null = window.localStorage.getItem("token");
    if (token) {
      return token;
    } else {
      token = "";
      return token;
    }
  }

  private setToken(token: string) {
    window.localStorage.setItem("token", token);
  }

  async get(URL: string) {
    const response = await fetch(`${this.baseURL}${URL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        authorization: `Bearer ${this.getToken()}`,
      },
    });
    return response;
  }

  async post(URL: string, body: any) {
    const response = await fetch(`${this.baseURL}${URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        authorization: `Bearer ${this.getToken()}`,
      },
      body: JSON.stringify(body),
    });

    const responseData = await response.json();
    if (responseData.token) {
      this.setToken(responseData.token);
    }

    return { response, responseData };
  }

  async put(URL: string, body: any) {
    const response = await fetch(`${this.baseURL}${URL}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(body),
    });
    return response;
  }

  async delete(URL: string) {
    await fetch(`${this.baseURL}${URL}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        authorization: `Bearer ${this.getToken()}`,
      },
    });
  }
}

export default new ApiService();
