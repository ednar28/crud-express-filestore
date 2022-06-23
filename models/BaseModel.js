import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "./firebase-token.json" assert {type: "json"};

class BaseModel {
  static app = undefined

  /**
   * first setup base model
   * @param var table
   */
  constructor (table) {
    if (!this.app) {
      this.app = initializeApp({ credential: cert(serviceAccount) })
    }

    const db = getFirestore(this.app)
    this.collection = db.collection(table)
  }

  /**
   * Get all data on table
   *
   * @return array
   */
  async get() {
    try {
      let data = []
      const collection = await this.collection.get()
      collection.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() })
      });

      return data
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * Create a new object on table
   *
   * @param object data
   * @return
   */
  async create (form = {}) {
    try {
      const collection = await this.collection.doc()
      await collection.set(form)

      return collection
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * Get some data on table
   *
   * @param string id
   * @return
   */
  async find(id) {
    const data = await this.collection.doc(id).get()
    return { id: data.id, ...data.data() }
  }

  /**
   * Update some data on table
   *
   * @param string id
   * @param object data
   * @param bool merge
   * @return
   */
  async update(id, form, merge = true) {
    return await this.collection.doc(id).set(form, { merge: merge })
  }

  /**
   * Delete some data on table
   *
   * @return
   */
  async delete(id) {
    return await this.collection.doc(id).delete()
  }
}

export default BaseModel