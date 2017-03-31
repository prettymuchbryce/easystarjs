export const TOP: 'TOP'
export const TOP_RIGHT: 'TOP_RIGHT'
export const RIGHT: 'RIGHT'
export const BOTTOM_RIGHT: 'BOTTOM_RIGHT'
export const BOTTOM: 'BOTTOM'
export const BOTTOM_LEFT: 'BOTTOM_LEFT'
export const LEFT: 'LEFT'
export const TOP_LEFT: 'TOP_LEFT'

type Direction = 'TOP' | 'TOP_RIGHT' | 'RIGHT' | 'BOTTOM_RIGHT' | 'BOTTOM' | 'BOTTOM_LEFT' | 'LEFT' | 'TOP_LEFT'

export class js {

  /**
   * Sets the collision grid that EasyStar uses.
   *
   * @param {Array|Number} tiles An array of numbers that represent
   * which tiles in your grid should be considered
   * acceptable, or "walkable".
   */
  setAcceptableTiles(tiles: number[] | number): void

  /**
   * Enables sync mode for this EasyStar instance..
   * if you're into that sort of thing.
   */
  enableSync(): void

  /**
   * Disables sync mode for this EasyStar instance.
   */
  disableSync(): void

  /**
   * Enable diagonal pathfinding.
   */
  enableDiagonals(): void

  /**
   * Disable diagonal pathfinding.
   */
  disableDiagonals(): void

  /**
   * Sets the collision grid that EasyStar uses.
   *
   * @param {Array} grid The collision grid that this EasyStar instance will read from.
   * This should be a 2D Array of Numbers.
   */
  setGrid(grid: number[][]): void

  /**
   * Sets the tile cost for a particular tile type.
   *
   * @param {Number} The tile type to set the cost for.
   * @param {Number} The multiplicative cost associated with the given tile.
   */
  setTileCost(tileType: number, cost: number): void

  /**
   * Sets the an additional cost for a particular point.
   * Overrides the cost from setTileCost.
   *
   * @param {Number} x The x value of the point to cost.
   * @param {Number} y The y value of the point to cost.
   * @param {Number} The multiplicative cost associated with the given point.
   */
  setAdditionalPointCost(x: number, y: number, cost: number): void

  /**
   * Remove the additional cost for a particular point.
   *
   * @param {Number} x The x value of the point to stop costing.
   * @param {Number} y The y value of the point to stop costing.
   */
  removeAdditionalPointCost(x: number, y: number): void

  /**
   * Remove all additional point costs.
   */
  removeAllAdditionalPointCosts(): void

  /**
   * Sets the number of search iterations per calculation.
   * A lower number provides a slower result, but more practical if you
   * have a large tile-map and don't want to block your thread while
   * finding a path.
   *
   * @param {Number} iterations The number of searches to prefrom per calculate() call.
   */
  setIterationsPerCalculation(iterations: number): void

  /**
   * Avoid a particular point on the grid,
   * regardless of whether or not it is an acceptable tile.
   *
   * @param {Number} x The x value of the point to avoid.
   * @param {Number} y The y value of the point to avoid.
   */
  avoidAdditionalPoint(x: number, y: number): void

  /**
   * Stop avoiding a particular point on the grid.
   *
   * @param {Number} x The x value of the point to stop avoiding.
   * @param {Number} y The y value of the point to stop avoiding.
   */
  stopAvoidingAdditionalPoint(x: number, y: number): void

  /**
   * Enables corner cutting in diagonal movement.
   */
  enableCornerCutting(): void

  /**
   * Disables corner cutting in diagonal movement.
   */
  disableCornerCutting(): void

  /**
   * Stop avoiding all additional points on the grid.
   */
  stopAvoidingAllAdditionalPoints(): void

  /**
   * Find a path.
   *
   * @param {Number} startX The X position of the starting point.
   * @param {Number} startY The Y position of the starting point.
   * @param {Number} endX The X position of the ending point.
   * @param {Number} endY The Y position of the ending point.
   * @param {Function} callback A function that is called when your path
   * is found, or no path is found.
   * @return {Number} A numeric, non-zero value which identifies the created instance. This value can be passed to cancelPath to cancel the path calculation.
   *
   */
  findPath(startX: number, startY: number, endX: number, endY: number, callback: (path: { x: number, y: number }[]) => void): number

  /**
   * Cancel a path calculation.
   *
   * @param {Number} instanceId The instance ID of the path being calculated
   * @return {Boolean} True if an instance was found and cancelled.
   *
   **/
  cancelPath(instanceId: number): boolean

  /**
   * This method steps through the A* Algorithm in an attempt to
   * find your path(s). It will search 4-8 tiles (depending on diagonals) for every calculation.
   * You can change the number of calculations done in a call by using
   * easystar.setIteratonsPerCalculation().
   */
  calculate(): void

  /**
   * Sets a directional condition on a tile
   *
   * @param {Number} x The x value of the point.
   * @param {Number} y The y value of the point.
   * @param {Array.<String>} allowedDirections A list of all the allowed directions from which the tile is accessible.
   *
   * eg. easystar.setDirectionalCondition(1, 1, ['TOP']): You can only access the tile by walking down onto it,
   */
  setDirectionalCondition(x: number, y: number, allowedDirections: Direction[]): void

  /**
   * Remove all directional conditions
   */
  removeAllDirectionalConditions(): void
}
