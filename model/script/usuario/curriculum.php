<?php
include('../../dao/Mysql.php');
include('../../dao/UsuarioDao.php');
include('../../dao/sectionDao.php');
include('../../dao/DataDao.php');
include('../../dao/CertificateDao.php');
include('../../vendor/autoload.php');
$mpdf = new \Mpdf\Mpdf(['en-GB-x', 'A4', '', '', 4, 4, 4, 4, 0, 0]);

if (isset($_GET['usuario_id'])) {
    $usuario_id = $_GET['usuario_id'];
    $usuarioDao = new UsuarioDao();
    $sectioDao = new SectionDao();
    $dataDao = new DataDao();
    $certificate= new CertificateDao();
    $usuario_rs = $usuarioDao->selectById($usuario_id);
    $section_rs= $sectioDao->select();
    $data_rs= $dataDao->select();
    $certificate_rs= $certificate->select();
    $usuario_r = mysqli_fetch_assoc($usuario_rs);
    
    
    
    

    $html = '
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            * {
                font-family: sans-serif;
                font-size: 15px;
                text-align: justify;
            }
        </style>
        <title>Document persona</title>
        </head>
        <body >
        <h1 style="text-align: center; font-size: 20px; "> Curriculum Vitae</h1>
        <table style=" width: 100%; ">
            <tr>
                <td style="width: 70%; ">
                    <span><b>Nombre:</b> '.$usuario_r['usuario_nombre'].'</span>
                </td>
                <td rowspan="5">
                    <img src="../../../view/src/files/usuario_foto/'.$usuario_r['usuario_foto'].'" alt="una foto nomas" width="150" height="150">
                </td>
            </tr>
            <tr>
                <td>
                    <span> <b>Fecha de Nacimiento:</b> '.$usuario_r['usuario_nacimiento'].'</span>
                </td>
            </tr>
            <tr>
                <td>
                    <span><b>direccion:</b> '.$usuario_r['usuario_direccion'].'</span>
                </td>
            </tr>
            <tr>
                <td>
                    <span><b>Cel:</b> '.$usuario_r['usuario_celular'].'</span>
                </td>
            </tr>
            <tr>
                <td>
                    <span><b>E-mail:</b> '.$usuario_r['usuario_email'].'</span>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <span><b>Perfil:</b> '.$usuario_r['usuario_descripcion'].'</span>
                </td>
            </tr>
            ';
            while($r_s=mysqli_fetch_assoc($section_rs)){ 
                if($r_s['usuario_id']==$usuario_id){
            $html.='

            <tr>
                <td colspan="2"> <br/>               
                    <b>'.$r_s['section_titulo'].'</b> <br/><br/>
                    <ul>
                        ';
                        mysqli_data_seek($data_rs,0);
                        while($r_d=mysqli_fetch_assoc($data_rs)){
                            if($r_s['section_id']==$r_d['section_id']){
                        $html.='
                        <br/><li><b>'.$r_d['data_titulo'].':</b> '.$r_d['data_detalle'].', ('.$r_d['data_fecha'].')</li> </br>
                        </br>
                        ';
                        }}
                        $html.='
                    </ul>
                </td>
                </br>
                </br>
            </tr>
            </br>
            </br>
            ';
            }}
            while($c_s= mysqli_fetch_assoc($certificate_rs)){
                if($c_s['certificate_estado']=="1"  && $c_s['usuario_id']==$usuario_id){
                    
            $html.='
           
            <tr >
            <td colspan="2">
            <center> <img src="../../../view/src/files/certificate_file/'.$c_s['certificate_file'].'" alt="una foto nomas" width="900" height="700"></center>
            </td>
            </tr>';
            }}
            $html.='
        </table>
    </body>
    </html>
    ';


    $mpdf->WriteHTML($html);
    $mpdf->Output('Reporte_Modelo_Curso.pdf', 'I');
    exit;
}
