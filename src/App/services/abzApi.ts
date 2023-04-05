import { toast } from "react-toastify";
import { IFormFields, IPosition, IUsers } from "../interfaces/IForm";

const abzTestApi = {
  URL: "https://frontend-test-assignment-api.abz.agency",
  nextUsersLink: "",

  async getPositions(): Promise<IPosition[] | void> {
    try {
      const response = await fetch(`${this.URL}/api/v1/positions`);
      const parsedResponse = await response.json();

      if (!parsedResponse.success) {
        toast.warn(`${parsedResponse.message}`);
        return;
      }
      return parsedResponse.positions;
    } catch (err: any) {
      toast.error(`${err}`);
    }
  },
  async resetUsersLink() {
    this.nextUsersLink = "";
  },
  async getUsers(): Promise<IUsers | void> {
    try {
      let response = await fetch(this.nextUsersLink ? this.nextUsersLink : `${this.URL}/api/v1/users?page=1&count=6`);
      const parsedResponse = await response.json();

      if (!parsedResponse.success) {
        toast.warn(`${parsedResponse.message}`);
        return;
      }

      this.nextUsersLink = parsedResponse.links.next_url;
      return {
        users: parsedResponse.users,
        lastPage: this.nextUsersLink ? false : true,
      };
    } catch (err: any) {
      toast.error(`${err}`);
    }
  },
  async getToken(): Promise<string | void> {
    try {
      const response = await fetch(`${this.URL}/api/v1/token`);

      const parsedResponse = await response.json();
      if (!parsedResponse.success) {
        toast.warn(`${parsedResponse.message}`);
        return;
      }

      return parsedResponse.token;
    } catch (err: any) {
      toast.error(`${err}`);
    }
  },
  async postUser(data: IFormFields): Promise<boolean> {
    try {
      let numberWithoutHyphen = data.phone.replace(/[^0-9+]/g, "");

      const formData = new FormData();
      formData.append("position_id", data.position);
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", numberWithoutHyphen);
      formData.append("photo", data.photo);
  
      const token = await this.getToken();
      if (token) {
        const response = await fetch(`${this.URL}/api/v1/users`, {
          method: "POST",
          body: formData,
          headers: {
            token,
          },
        });
        const parsedResponse = await response.json();
  
        if (!parsedResponse.success) {
          toast.warn(`${parsedResponse.message}`);
        }
        return parsedResponse.success;
      }
      return false;
    } catch (err) {
      toast.error(`${err}`);
      return false;
    }
  },
};

export default abzTestApi;
