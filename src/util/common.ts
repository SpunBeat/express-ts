export const setPropsFrom = (config: any, updates: any[]) => {
  const { props, from, $set = { updates: [ ...updates, { updated: new Date() } ] } } = config
  for (const i in props) {
    if (from[i] !== undefined && from[i]  !== null) {
      $set[i] = from[i]
    }
  }
  return { $set } 
}

export const getSchemaProps = (schema: any) => {
  const tree = []
  for (const i in schema.tree) {
    tree.push(i)
  }
  return tree.filter(i => i !== 'id' && i !== '_id' && i !== '__v' && i !== 'created')
}

export const createBodyValidator = (body: any) => {
  const $set = <any>{};
  for (const key in body) {
    if (body.hasOwnProperty(key)) {
      const element = body[key];
      if (element !== null && element !== undefined) {
        $set[key] = element;
      }
    }
  }
  return $set;
}

export const capitalize = (s: string) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}