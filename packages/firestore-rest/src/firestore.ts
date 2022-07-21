import axios from "axios";
import type { WhereFilterOp } from "firebase/firestore";
import { getIdToken, User } from "firebase/auth";
import { buildFilter, fromValue } from "./builder";
import {
  CompositeFilter,
  Cursor,
  Document,
  FieldFilterValue,
  Filter,
  QueryDocumentSnapshot,
  StructuredQuery,
} from "./type";
import { join } from "path";

const validNonnNegativeInteger = (val: number) =>
  Number.isSafeInteger(val) && val >= 0;

const isCompositeFilter = (filter: Filter): filter is CompositeFilter =>
  Object.keys(filter).includes("compositeFilter");

class Collection {
  #path: string;
  #offset: number = 0;
  #limit?: number;
  #startAt?: Cursor;
  #endAt?: Cursor;
  #filter?: Filter;
  readonly app: App;
  public constructor(app: App, path: string) {
    this.app = app;
    this.#path = path;
  }

  public where(
    key: string,
    operator: Exclude<WhereFilterOp, "in" | "not-in">,
    val: FieldFilterValue,
  ): Collection;
  public where(
    key: string,
    operator: Extract<WhereFilterOp, "in" | "not-in">,
    val: FieldFilterValue[],
  ): Collection;
  public where(
    key: string,
    operator: WhereFilterOp,
    val: FieldFilterValue | FieldFilterValue[],
  ): Collection {
    const filter = buildFilter(key, operator, val);
    if (!this.#filter) {
      this.#filter = filter;
    } else if (isCompositeFilter(this.#filter)) {
      this.#filter.compositeFilter.filters.push(filter);
    } else {
      this.#filter = {
        compositeFilter: {
          op: "AND",
          filters: [
            this.#filter,
            filter,
          ],
        },
      };
    }
    return this;
  }
  public offset(val: number) {
    if (!validNonnNegativeInteger(val)) {
      throw `erro: please enter a usable integer value, value=${val}`;
    }
    this.#offset = val;
    return this;
  }
  public limit(val: number) {
    if (!validNonnNegativeInteger(val)) {
      throw `erro: please enter a usable integer value, value=${val}`;
    }
    this.#limit = val;
    return this;
  }
  public startAt(cursor: Cursor) {
    this.#startAt = cursor;
    return this;
  }
  public endAt(cursor: Cursor) {
    this.#endAt = cursor;
    return this;
  }

  get #queryEndpoint() {
    return `${this.app.endpoint}:runQuery` as const;
  }

  public async query(user?: User) {
    const structuredQuery: StructuredQuery = {
      from: [
        { collectionId: this.#path },
      ],
      where: this.#filter,
      startAt: this.#startAt,
      endAt: this.#endAt,
      offset: this.#offset,
      limit: this.#limit,
    };
    let Authorization: string = "";
    if (user) {
      const token = await getIdToken(user);
      Authorization = `Bearer ${token}`;
    }
    const result = await axios.post<QueryDocumentSnapshot[]>(
      this.#queryEndpoint,
      {
        structuredQuery,
      },
      {
        headers: {
          Authorization,
        },
      },
    );
    if (result.status >= 200 && result.status < 300) {
      return result.data;
    } else {
      throw result.status;
    }
  }
}

const authToken = async (user?: User) => {
  if (user) {
    const token = await getIdToken(user);
    return `Bearer ${token}`;
  } else {
    return "";
  }
};

export const getDocumentData = async (
  app: App,
  path: `/${string}`,
  user?: User,
) => {
  const result = await axios.get<Document<object>>(
    [app.endpoint, path].join(""),
    { headers: { Authorization: (await authToken(user)) } },
  );
  return Object.entries(result.data.fields).reduce(
    (prev, [key, val]) => ({ ...prev, [key]: fromValue(val) }),
    {},
  );
};

export class App {
  projectID: string;
  get endpoint() {
    return `https://firestore.googleapis.com/v1/projects/${this.projectID}/databases/(default)/documents` as const;
  }
  public constructor(projectID: string) {
    this.projectID = projectID;
  }
}
