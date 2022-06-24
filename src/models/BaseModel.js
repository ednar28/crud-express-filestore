import { initializeApp, cert } from 'firebase-admin/app'
import { FieldPath, getFirestore } from 'firebase-admin/firestore'
import { setupEnvironment } from '../config/environment.js'

var instance = undefined
class BaseModel {

  /**
   * first setup base model
   * @param var table
   */
  constructor (table) {
    if (!instance) {
      setupEnvironment(process.env.NODE_ENV)

      instance = initializeApp({
        credential: cert({
          'type': process.env.FIREBASE_TYPE,
          'project_id': process.env.FIREBASE_PROJECT_ID,
          'private_key_id': process.env.FIREBASE_PRIVATE_KEY_ID,
          'private_key': process.env.FIREBASE_PRIVATE_KEY,
          'client_email': process.env.FIREBASE_CLIENT_EMAIL,
          'client_id': process.env.FIREBASE_CLIENT_ID,
          'auth_uri': process.env.FIREBASE_AUTH_URI,
          'token_uri': process.env.FIREBASE_TOKEN_URI,
          'auth_provider_x509_cert_url': process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
          'client_x509_cert_url': process.env.FIREBASE_CLIENT_X509_CERT_URL,
        }),
      })
    }

    const db = getFirestore(instance)
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
      const collection = await this.collection.get()
      collection.forEach((doc) => {
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
      const collection = this.collection.doc()
      await collection.set(data)

      return collection
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
}

export default BaseModel