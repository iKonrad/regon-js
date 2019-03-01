import Regon from "../dist";

(async () => {
  const client = new Regon(process.env.API_KEY);
  await client.login();
  const result = await client.search({
    nip: 7251992072
  });
})();
