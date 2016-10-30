import { CollectionObject } from './collection-object.model';
import { Contact } from './contact.model';

export interface Client extends CollectionObject {
  clientId: string;
  projectId?: string[];
  contact?: Contact;
}

// 
//
// { "_id" : "DsZARAeAywv8DYuFJ",
// "createdAt" : ISODate("2016-10-30T00:47:03.416Z"),
// "services" : { "password" : { "bcrypt" : "$2a$10$6DdEZRab7w6gU/vACV672.jpQu7lrh275HVr2JrN9zruNytea3Ohe" }, "resume" : { "loginTokens" : [ { "when" : ISODate("2016-10-30T00:47:03.665Z"), "hashedToken" : "Zytk5EzFdc1TdSGMvpPkwf9MPVJA8Ej8KKWt7q5QMx8=" } ] } },
// "emails" : [ { "address" : "client@a.a", "verified" : false } ],
// "roles" : { "default-group" : [ "client" ] } }
