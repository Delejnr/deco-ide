/**
 *    Copyright (C) 2015 Deco Software Inc.
 *
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU Affero General Public License, version 3,
 *    as published by the Free Software Foundation.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU Affero General Public License for more details.
 *
 *    You should have received a copy of the GNU Affero General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

/**
 * Creates a store enhancer that registers the current dispatch
 * onto an action emitter.
 *
 * This is useful if an external event emitter needs to plug into the
 * redux pattern
 *
 * @param {...Function} actionEmitters The actionEmitters to register.
 * @returns {Function} A store enhancer registering the action emitters.
 */
export default function applyActionEmitters(store) {
  return (...actionEmitters) => {
    var emitterAPI = {
      getState: store.getState,
      dispatch: (action) => store.dispatch(action)
    }

    actionEmitters.forEach(actionEmitter => {
      actionEmitter(emitterAPI)
    })
  }
}
