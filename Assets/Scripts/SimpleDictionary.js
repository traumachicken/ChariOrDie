
/*
    SimpleDictionary
    Author: Tonio Loewald
    Date: 4/27/2009
    
    Implements a simple key/value dictionary (of strings)
    Also allows loading and saving of dictionaries from text files
    "=" should not be used in key strings!
    
    Usage:
    var d = new SimpleDictionary();
    
    d.Set( "foo", "bar" );
    print( d.Get( "foo" ) ); // "bar"
    
    d.Set( "bar", "baz" );
    d.Set( "foo", "blah" );
    print( d.Get( "foo" ) ); // "blah"
    
    d.Remove( "foo" );
    print( d.Count() ); // 1
    d.Set( "foxtrot", "uniform" );
    d.Save( "test.ini" ); // file will be bar=baz\nfoxtrot=uniform\n
*/

import System;
import System.IO;

class SimpleDictionary extends ScriptableObject {
    public var keys = new Array();
    public var values = new Array();

    function Get( key : String ) : String {
        for(var i = 0; i < keys.length; i++){
            if( keys[i] == key ){
                return( values[i] );
            }
        }
    
        return "";
    }

    function Set( key : String, val : String ) {
        for(var i = 0; i < keys.length; i++){
            if( keys[i] == key ){
                values[i] = val;
                return;
            }
        }
    
        keys.push( key );
        values.push( val );
    }
    
    function Remove( key : String ){
        for(var i = 0; i < keys.length; i++){
            if( keys[i] == key ){
                keys.RemoveAt(i);
                values.RemoveAt(i);
                return;
            }
        }
        print( "SimpleDictionary.Remove failed, key not found: " + key );
    }

    function Save( fileName : String ){
        var sw : StreamWriter = new StreamWriter ( Application.dataPath + "/" + fileName );
        for(var i = 0; i < keys.length; i++){
            sw.WriteLine( keys[i] + "=" + values[i] );
        }
        sw.Close ();
        print ( "SimpleDictionary.Saved " + Application.dataPath + "/" + fileName );
    }

    function Load( fileName : String ) : SimpleDictionary {
        keys = new Array();
        values = new Array();
    
        var line : String = "-";
        var offset : int;
        try {
            var sr : StreamReader = new StreamReader ( Application.dataPath + "/" + fileName );
            line = sr.ReadLine();
        while (line != null) {
            offset = line.IndexOf("=");
                if( offset > 0 ){
                    Set( line.Substring(0, offset), line.Substring(offset+1) );
                }
                line = sr.ReadLine();
        }
            sr.Close();
            print ( "SimpleDictionary.Loaded " + Application.dataPath + "/" + fileName );
        }
        catch (e) {
            print ( "SimpleDictionary.Load failed: " + Application.dataPath + "/" + fileName );
        }
    }

    function Count(){
        return keys.length;
    }
}