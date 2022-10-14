/*
 * Copyright 2022 ABSA Group Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Filesystem Module.
 * The implementation tries to follow the CommonJS Filesystem/A/0 specification where possible.
 *
 * WORKING DIRECTORY
 * The directory functions below shouldn’t use the current working directory of the server like . or ./test.
 * You will not be able to tell whether the environment the server is running in will permit directory listing, reading or writing of files.
 *
 * You should either base your directories with getTempPath(), or as a Foxx service use the module.context.basePath.
 */
declare module 'fs' {

    ////////////////////////////////////////////////////////////////////////
    // Single File Directory Manipulation
    ////////////////////////////////////////////////////////////////////////

    /**
     * Checks if a file of any type or directory exists.
     *
     * @param path
     * @return true if a file or a directory exists at a given path.
     */
    export function exists(path: string): boolean

    /**
     * Tests if path is a file.
     *
     * @param path
     * @return true if the path points to a file.
     */
    export function isFile(path: string): boolean

    /**
     * Tests if path is a directory.
     *
     * @param path
     * @return true if the path points to a directory.
     */
    export function isDirectory(path: string): boolean

    /**
     * Gets the size of a file.
     * @param path
     * @return the size of the file specified by path.
     */
    export function size(path: string): number

    /**
     * Gets the last modification time of a file.
     * @param filename
     * @return the last modification date of the specified file. The date is returned as a Unix timestamp (number of seconds elapsed since January 1, 1970).
     */
    export function mtime(filename: string): number

    /**
     * If you want to combine two paths you can use fs.pathSeparator instead of / or \\.
     */
    export const pathSeparator: string

    /**
     * The function returns the combination of the path and filename, e.g.
     * ```
     * fs.join('folder', 'file.ext') would return folder/file.ext.
     * ```
     * @param path
     * @param filename
     * @return combined path
     */
    export function join(path: string, filename: string): string

    /**
     * Returns the name for a (new) temporary file.
     * Note: The directory must exist.
     *
     * @param directory
     * @param createFile
     * @return the name for a new temporary file in directory. If createFile is true, an empty file will be created so no other process can create a file of the same name.
     */
    export function getTempFile(directory: string, createFile: boolean): string

    /**
     * Returns the absolute path of the temporary directory.
     *
     * @return path
     */
    export function getTempPath(): string

    /**
     * Makes a given path absolute.
     *
     * @param path
     * @return the given string if it is an absolute path, otherwise an absolute path to the same location is returned.
     */
    export function makeAbsolute(path: string): string

    /**
     * Sets file permissions of specified files (non windows only).
     *
     * @param path
     * @param mode a string with a leading zero matching the OCTAL-MODE as explained in *nix man chmod.
     * @return true on success.
     */
    export function chmod(path: string, mode: string): boolean

    /**
     * Returns the directory listing.
     * The function returns the names of all the files in a directory, in lexically sorted order.
     * Throws an exception if the directory cannot be traversed (or path is not a directory).
     * Note: this means that list(“x”) of a directory containing “a” and “b” would return [“a”, “b”], not [“x/a”, “x/b”].
     *
     * @param path
     * @return array of paths
     */
    export function list(path: string): string[]

    /**
     * The function returns an array that starts with the given path, and all the paths
     * relative to the given path, discovered by a depth first traversal of every directory
     * in any visited directory, reporting but not traversing symbolic links to directories.
     * The first path is always "", the path relative to itself.
     *
     * @param path
     * @return returns the directory tree
     */
    export function listTree(path: string): string

    /**
     * Creates the directory specified by path.
     *
     * @param path
     */
    export function makeDirectory(path: string): unknown

    /**
     * Creates the directory hierarchy specified by path.
     *
     * @param path
     */
    export function makeDirectoryRecursive(path: string): unknown

    /**
     * Removes the file filename at the given path.
     * Throws an exception if the path corresponds to anything that is not a file or a symbolic link.
     * If “path” refers to a symbolic link, removes the symbolic link.
     *
     * @param filename
     */
    export function remove(filename: string): unknown

    /**
     * Removes an empty directory.
     * Throws an exception if the path is not an empty directory.
     *
     * @param path
     */
    export function removeDirectory(path: string): unknown

    /**
     * Removes a directory with all sub-elements.
     * Throws an exception if the path is not a directory.
     *
     * @param path
     */
    export function removeDirectoryRecursive(path: string): unknown

    ////////////////////////////////////////////////////////////////////////
    // File IO
    ////////////////////////////////////////////////////////////////////////

    /**
     * Reads in a file and returns the content as string.
     * Please note that the file content must be encoded in UTF-8.
     *
     * @param filename
     * @return file content as string
     */
    export function read(filename: string): string

    /**
     * Reads in a file and returns the content as string.
     * The file content is Base64 encoded.
     *
     * @param filename
     * @return file content as string
     */
    export function read64(filename: string): string

    /**
     * Reads in a file and returns its content in a Buffer object.
     *
     * @param filename
     * @return buffer
     */
    export function readBuffer(filename: string): Buffer

    /**
     * Reads the contents of the file specified in filename. If encoding is specified, the file contents will be returned as a string. Supported encodings are:
     *
     * - utf8 or utf-8
     * - ascii
     * - base64
     * - ucs2 or ucs-2
     * - utf16le or utf16be
     * - hex
     *
     * If no encoding is specified, the file contents will be returned in a Buffer object.
     *
     * @param filename
     * @param encoding
     * @return buffer
     */
    export function readFileSync(filename: string, encoding: string): Buffer

    /**
     * Writes the content into a file.
     * Content can be a string or a Buffer object.
     * If the file already exists, it is truncated.
     *
     * @param filename
     * @param content
     */
    export function write(filename: string, content: string): unknown

    /**
     * This is an alias for fs.write(filename, content)
     *
     * @param filename
     * @param content
     */
    export function writeFileSync(filename: string, content: string): unknown

    /**
     * Writes the content into a file. Content can be a string or a Buffer object.
     * If the file already exists, the content is appended at the end.
     *
     * @param filename
     * @param content
     */
    export function append(filename: string, content: string): unknown

    ////////////////////////////////////////////////////////////////////////
    // Recursive Manipulation
    ////////////////////////////////////////////////////////////////////////

    /**
     * Copies source to destination.
     *
     * Exceptions will be thrown on:
     * - Failure to copy the file
     * - specifying a directory for destination when source is a file
     * - specifying a directory as source and destination
     *
     * @param source
     * @param destination
     */
    export function copyRecursive(source: string, destination: string): unknown

    /**
     * Copies source to destination.
     * If Destination is a directory, a file of the same name will be created
     * in that directory, else the copy will get the specified filename.
     *
     * @param source
     * @param destination
     */
    export function copyFile(source: string, destination: string): unknown

    /**
     * Creates a symbolic link from a target in the place of linkpath.
     * In linkpath a symbolic link to target will be created.
     *
     * @param target
     * @param linkpath
     */
    export function linkFile(target: string, linkpath: string): unknown

    /**
     * Renames a file.
     * Moves source to destination. Failure to move the file, or specifying a directory
     * for destination when source is a file will throw an exception.
     * Likewise, specifying a directory as source and destination will fail.
     *
     * @param source
     * @param destination
     */
    export function move(source, destination): unknown

    ////////////////////////////////////////////////////////////////////////
    // ZIP
    ////////////////////////////////////////////////////////////////////////

    /**
     * Unzips the zip file specified by filename into the path specified by outPath.
     * Overwrites any existing target files if overwrite is set to true.
     *
     * @param filename
     * @param outPath
     * @param skipPaths
     * @param overwrite
     * @param password
     * @return true if the file was unzipped successfully.
     */
    export function unzipFile(filename: string, outPath: string, skipPaths: string[], overwrite: boolean, password: string): boolean

    /**
     * Stores the files specified by files in the zip file filename.
     * If the file filename already exists, an error is thrown.
     * The list of input files must be given as a list of absolute filenames.
     * If chdir is not empty, the chdir prefix will be stripped from the filename
     * in the zip file, so when it is unzipped filenames will be relative.
     * Specifying a password is optional.
     *
     * @param filename
     * @param chdir
     * @param files
     * @param password
     * @return true if the file was zipped successfully.
     */
    export function zipFile(filename: string, chdir: string, files: string[], password: string): boolean
}

