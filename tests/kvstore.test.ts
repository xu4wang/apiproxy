import db from "../src/lib/kvstore"


test('db can be set and read', async () => {
    db.set("key","value");
    
    const v = db.get("key");
    //the get method should return headers,params and body in the JSON body
    expect(v).toBe("value");
})