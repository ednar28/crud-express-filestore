import { FieldPath, getFirestore } from 'firebase-admin/firestore'
import Database from '../config/database.js'

class BaseModel {

  /**
   * first setup base model
   * @param var table
   */
  constructor (table) {
    this.instance = new Database().getInstance()

    const db = getFirestore(this.instance)
    this.db = db
    this.collection = db.collection(table)
  }

  /**
   * Get all data on table
   *
   * @return array
   */
  async get () {
    try {
      let data = []
      const snapshot = await this.collection.get()
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() })
      })

      return data
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * Create a new object on table
   *
   * @param object data
   * @return object
   */
  async create (data = {}) {
    try {
      const snapshot = this.collection.doc()
      await snapshot.set(data)

      return snapshot
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * Create many object on table
   *
   * @param array data
   * @return array
   */
  async createMany (data = []) {
    try {
      const batch = this.db.batch()
      let ids = []

      data.forEach(form => {
        const docRef = this.collection.doc()
        ids.push(docRef.id)
        batch.set(docRef, form)
      })

      await batch.commit()

      return ids
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * Get some data on table
   *
   * @param string id
   * @return object
   */
  async find (id) {
    const data = await this.collection.doc(id).get()
    return { id: data.id, ...data.data() }
  }

  /**
   * Get data whereIn ids
   *
   * @param array ids
   * @return array
   */
  async finds (ids = []) {
    let data = []
    const collection = await this.collection.where(FieldPath.documentId(), 'in', ids).get()

    collection.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() })
    })

    return data
  }

  /**
   * Update some data on table
   *
   * @param string id
   * @param object data
   * @param bool merge
   * @return object
   */
  async update (id, data, merge = true) {
    return await this.collection.doc(id).set(data, { merge: merge })
  }

  /**
   * Delete some data on table
   *
   * @return void
   */
  async delete (id) {
    return await this.collection.doc(id).delete()
  }

  /**
   * Delete all data on table
   *
   * @return void
   */
  async deleteAll () {
    const snapshot = await this.collection.get()

    snapshot.forEach(user => {
      this.delete(user.id)
    })
  }
}

export default BaseModel