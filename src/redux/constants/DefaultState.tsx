export interface DefaultStateInterface {
    "type": any,
    "data": object,
    "loading": boolean,
    "status": any
}

export const DefaultState: DefaultStateInterface =  {
    type: null,
    data: {},
    loading: true,
    status: null
}