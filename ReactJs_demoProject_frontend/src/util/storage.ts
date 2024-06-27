import SecureLS from "secure-ls";

const ls = new SecureLS();

const storage = {
  set: (key: string, data: unknown): void => {
    ls.set(key, data);
  },

  get: (key: string): string => ls.get(key),

  remove: (key: string): void => {
    ls.remove(key);
  },

  removeAll: (): void => {
    ls.removeAll();
  },

  clear: (): void => {
    ls.clear();
  },

  getAllKeys: (): string[] => ls.getAllKeys(),
};

export default storage;
