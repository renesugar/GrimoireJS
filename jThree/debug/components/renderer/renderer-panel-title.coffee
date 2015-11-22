React = require 'react'
ReactDOM = require 'react-dom'
class RendererPanelTitle extends React.Component

  constructor:(props)->
    super props

  render:->
    <div style={styles.container}>
      <p>
        <span style={styles.name}>{@props.renderer.name}</span>
        <span style={styles.typeName}>{@props.renderer.getTypeName()}</span>
      </p>
      <p style={styles.id}>{@props.renderer.Camera.ParentScene.ID + "(" + @props.renderer.Camera.name + ")"}</p>
      <p style={styles.id}>{"ID " + @props.renderer.ID}</p>
      <a onClick={@getShadowMap}>Get shadow map</a>
      <div ref="container"></div>
    </div>

  getShadowMap:=>
    @props.rdrDebugger.getShadowMapImage(@props.renderer.ID,@alphaRemove).then (image)=>
      container = ReactDOM.findDOMNode @refs.container
      container.innerHTML = ''
      container.appendChild image

  shadowMapGenerator:(width,height,arr)=>
    result = new Uint8Array width * height * 4
    for x in [0..width]
      for y in [0..height]
        depth =  arr[4 * ((height - y) * width + x) + 2]/256;
        result[4*(y * width + x) + 0] = isNaN(depth)?255:0
        result[4*(y * width + x) + 1] = depth == 0 ? 0:255;
        result[4*(y * width + x) + 2] = depth == 0 ? 255 : 0;
        result[4*(y * width + x) + 3] = 255
    arr

  alphaRemove:(width,height,arr)=>
    result = new Uint8Array width * height * 4
    for x in [0..width]
      for y in [0..height]
        result[4*(y * width + x) + 0] = arr[4 * ((height - y) * width + x) + 0]*255
        result[4*(y * width + x) + 1] = arr[4 * ((height - y) * width + x) + 1]*255
        result[4*(y * width + x) + 2] = arr[4 * ((height - y) * width + x) + 2]*255
        result[4*(y * width + x) + 3] = 255
    result

styles =
  container:
    margin:10
  name:
    color:"white"
    fontSize:"x-large"
  typeName:
    color:"lightgray"
  id:
    color:"lightgray"

module.exports = RendererPanelTitle;
