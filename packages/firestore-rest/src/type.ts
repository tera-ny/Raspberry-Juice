import type { DocumentReference, Timestamp } from "firebase/firestore";

export interface NullValue {
  nullValue: null;
}
export interface BooleanValue {
  booleanValue: boolean;
}
export interface IntegerValue {
  integerValue: string;
}
export interface DoubleValue {
  doubleValue: number;
}
export interface TimestampValue {
  timestampValue: string;
}
export interface StringValue {
  stringValue: string;
}
export interface BytesValue {
  bytesValue: string;
}
export interface ReferenceValue {
  referenceValue: string;
}
export interface GeoPointValue {
  geoPointValue: LatLng;
}
export interface ArrayValue {
  arrayValue: {
    values: Value[];
  };
}
export interface MapValue {
  mapValue: {
    fields: {
      [key: string]: Value;
    };
  };
}
export type Value =
  | NullValue
  | BooleanValue
  | IntegerValue
  | DoubleValue
  | TimestampValue
  | StringValue
  | BytesValue
  | ReferenceValue
  | GeoPointValue
  | ArrayValue
  | MapValue;

export type FieldFilterValue =
  | string
  | number
  | boolean
  | Timestamp
  | DocumentReference
  | null
  | object;

type FieldReference = {
  fieldPath: string;
};

export type Filter = CompositeFilter | FieldFilter | UnaryFilter;

export type CompositeFilter = {
  compositeFilter: {
    op: "AND";
    filters: Filter[];
  };
};

export type FieldFilterOperator =
  | "LESS_THAN"
  | "LESS_THAN_OR_EQUAL"
  | "GREATER_THAN"
  | "GREATER_THAN_OR_EQUAL"
  | "EQUAL"
  | "ARRAY_CONTAINS"
  | "IN"
  | "ARRAY_CONTAINS_ANY"
  | "NOT_EQUAL"
  | "NOT_IN";

type FieldFilter = {
  fieldFilter: {
    field: FieldReference;
    op: FieldFilterOperator;
    value: Value;
  };
};

type UnaryFilterOperator = "IS_NAN" | "IS_NULL" | "IS_NOT_NAN" | "IS_NOT_NULL";

type UnaryFilter = {
  unaryFilter: {
    op: UnaryFilterOperator;
    field: FieldReference;
  };
};

type LatLng = {
  latitude: number;
  longitude: number;
};

export type Cursor = {
  values: Value[];
  before: boolean;
};

interface CollectionSelector {
  collectionId: string;
  allDescendants?: boolean;
}

export interface StructuredQuery {
  from: CollectionSelector[];
  where?: Filter;
  startAt?: Cursor;
  endAt?: Cursor;
  offset?: number;
  limit?: number;
  //TODO
  // orderBy?: Order[];
}

export interface Document<T> {
  name: string;
  fields: T;
  createTime: string;
  updateTime: string;
}

export interface QueryDocumentSnapshot {
  transaction?: string;
  document: Document<object>;
  readTime?: string;
  skippedResults?: number;
  done?: boolean;
}
