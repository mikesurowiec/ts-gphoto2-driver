///<reference path="../types/GPCodes.ts"/>
import {refType, types} from "ref";
import {GPCodes, PointerOf, Ref} from "../types";
import {PointerList} from "./GPListModule";

/**
 *
 */
export type PointerPortInfoList = PointerOf<void>;
/**
 *
 * @type {Type}
 */
export const RefPortInfoList = Ref;
/**
 *
 */
export type PointerPortInfo = PointerOf<void>;

/**
 *
 */
export const RefPortInfo = Ref;

/**
 *
 * @type {any}
 */
export const GPPortInfoModuleDescription = {
  gp_port_result_as_string: [types.CString, ["int"]],

  gp_port_info_new: ["int", [refType(RefPortInfo)]],
  // gp_port_info_free: ["int", [RefPortInfo]],

  gp_port_info_list_new: ["int", [refType(RefPortInfoList)]],
  gp_port_info_list_load: ["int", [RefPortInfoList]],
  gp_port_info_list_free: ["int", [RefPortInfoList]],
  gp_port_info_list_get_info: ["int", [RefPortInfoList, "int", RefPortInfo]],

  gp_port_info_list_lookup_path: ["int", [RefPortInfoList, types.CString]],
  gp_port_info_list_lookup_name: ["int", [RefPortInfoList, types.CString]]
};

/**
 *
 */
export interface IGPPortInfoModule {
  /**
   * Create a new portinfo.
   *
   * Allocates and initializes a GPPortInfo structure. This is a libgphoto2_port internal function.
   *
   * @param {PointerOf<PointerPortInfo>} info pointer to a #GPPortInfo
   * @returns {GPCodes} a gphoto2 error code
   */
  gp_port_info_new(info: PointerOf<PointerPortInfo>): GPCodes;

  // gp_port_info_free(portInfo: PointerPortInfo): GPCodes;

  /**
   * Returns a string representation of a gphoto2 error code. Those are static error descriptions. You can get dynamic ones that explain the error more in depth using gp_port_get_error.
   * @param {number} arg
   * @returns {string} a string representation of a gphoto2 error code
   */
  gp_port_result_as_string(arg: number): string; // ["string", ["int"]],
  /**
   * Create a new GPPortInfoList.
   *
   * Creates a new list which can later be filled with port infos (#GPPortInfo) using {@link GPhoto2Driver.gp_port_info_list_load}.
   *
   * @param {Buffer} buffer pointer to a GPPortInfoList* which is allocated
   * @returns {GPCodes} a gphoto2 error code
   */
  gp_port_info_list_new(buffer: PointerOf<PointerPortInfoList>): GPCodes;

  /**
   * Load system ports.
   *
   * Searches the system for io-drivers and appends them to the list. You would normally call this function once after gp_port_info_list_new and then use this list in order to supply gp_port_set_info with parameters or to do autodetection.
   *
   * @param {PointerPortInfoList} portInfoList a #GPPortInfoList
   * @returns {GPCodes} a gphoto2 error code
   */
  gp_port_info_list_load(portInfoList: PointerPortInfoList): GPCodes;

  /**
   * Free a GPPortInfo list.
   *
   * Frees a GPPortInfoList structure and its internal data structures.
   *
   * @param {PointerPortInfoList} portInfoList a #GPPortInfoList
   * @returns {GPCodes} a gphoto2 error code
   */
  gp_port_info_list_free(portInfoList: PointerPortInfoList): GPCodes;

  /**
   * Get port information of specific entry.
   *
   * Returns a pointer to the current port entry.
   *
   * References GP_OK, and _GPPortInfo::name.
   * Referenced by gp_abilities_list_detect(), and gp_camera_init().
   *
   * @param portInfoList a #GPPortInfoList
   * @param {number} index the index of the entry
   * @param portInfo the returned information
   * @returns {GPCodes} a gphoto2 error code
   */
  gp_port_info_list_get_info(portInfoList: PointerPortInfoList | PointerList, index: number, portInfo: PointerPortInfo): GPCodes;

  /**
   * Lookup a specific path in the list.
   *
   * Looks for an entry in the list with the supplied path. If no exact match can be found, a regex search will be performed in the hope some driver claimed ports like "serial:*".
   *
   * @param {PointerPortInfoList} portInfoList a #GPPortInfoList
   * @param {string} path a path
   * @returns {GPCodes} a gphoto2 error code
   */
  gp_port_info_list_lookup_path(portInfoList: PointerPortInfoList, path: string): GPCodes;

  /**
   * Look up a name in the list.
   *
   * Looks for an entry in the list with the exact given name.
   *
   * @param {PointerPortInfoList} portInfoList a #GPPortInfoList
   * @param {string} name a name
   * @returns {GPCodes} The index of the entry or a gphoto2 error code
   */
  gp_port_info_list_lookup_name(portInfoList: PointerPortInfoList, name: string): GPCodes;
}
