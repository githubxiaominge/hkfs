/**
 * Created by 小敏哥 on 2016/5/30.
 */

function testClass(){
    this.a=123;
    this.b=236;
    this.testfn=function(){
        alert('dsf');
        $('#footerid').css('color','red');
    }
}
module.exports=new testClass();