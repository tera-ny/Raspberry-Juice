export const REST_API_ENDPOINT =
  `https://firestore.googleapis.com/v1/projects/${process.env.PROJECT_ID}/databases/(default)/documents/`;

type Value = {
  nullValue: null;
} | {
  booleanValue: boolean;
} | {
  integerValue: string;
} | {
  doubleValue: number;
} | {
  timestampValue: string;
} | {
  stringValue: string;
} | {
  bytesValue: string;
} | {
  referenceValue: string;
} | {
  geoPointValue: LatLng;
} | {
  arrayValue: ArrayValue;
} | {
  mapValue: MapValue;
};

type LatLng = {
  latitude: number;
  longitude: number;
};

type ArrayValue = {
  values: Value[];
};

type MapValue = {
  fields: {
    [key: string]: Value;
  };
};

type Cursor = {
  values: Value[];
  before: boolean;
};

type Operator = "==" | ">" | ">=" | "<" | "<=";

const validNonnNegativeInteger = (val: number) =>
  Number.isSafeInteger(val) && val >= 0;

class Collection {
  #path: string;
  #offset?: number;
  #limit?: number;
  #startAt?: Cursor;
  #endAt?: Cursor;
  readonly app: App;
  constructor(app: App, path: string) {
    this.app = app;
    this.#path = path;
  }
  where(key: string, operator: Operator, val: string) {
  }
  offset(val: number) {
    if (!validNonnNegativeInteger(val)) {
      throw `erro: please enter a usable integer value, value=${val}`;
    }
    this.#offset = val;
    return this;
  }
  limit(val: number) {
    if (!validNonnNegativeInteger(val)) {
      throw `erro: please enter a usable integer value, value=${val}`;
    }
    this.#limit = val;
    return this;
  }
  startAt(cursor: Cursor) {
    this.#startAt = cursor;
    return this;
  }
  endAt(cursor: Cursor) {
    this.#endAt = cursor;
    return this;
  }
}

class App {
  projectID: string;
  constructor(projectID: string) {
    this.projectID = projectID;
  }
}
