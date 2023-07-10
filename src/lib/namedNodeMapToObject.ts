const namedNodeMapToObject = (namedNodeMap: NamedNodeMap) => {
  const obj: { [key: string]: string } = {}

  for (let i = 0; i < namedNodeMap.length; i++) {
    const { name, value } = namedNodeMap[i]
    obj[name] = value
  }

  return obj
}

export default namedNodeMapToObject
