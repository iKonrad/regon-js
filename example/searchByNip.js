import Regon from "../dist";

(async () => {
  const client = new Regon({
    key: process.env.API_KEY,
    sandbox: false
  });
  await client.login();
  const result = await client.search({
    nip: 7251992072
  });
})();
