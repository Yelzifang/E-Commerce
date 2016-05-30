package k.service.commodity;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import k.dao.DBO;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * Servlet implementation class ShowCom
 */
@WebServlet("/ShowCom")
public class ShowCom extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ShowCom() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setContentType("text/html;charset=utf-8");
		HttpSession session = request.getSession();//存储账号密码
		int merid = (int)session.getAttribute("id");
		String params[] = new String[]{String.valueOf(merid)};
		PrintWriter out = response.getWriter();
		//对数据进行数据库查询
		DBO db = new DBO();
		ResultSet rs = null;
		String sql = null ;
		
		JSONObject json = new JSONObject();
		JSONArray js = new JSONArray();//存储顾客数据
		Boolean status = false;
		String detail = null;
		try {
			Connection conn = db.getConn();
			if(conn!=null)
				System.out.println("conn sucess!");
			
			sql = new String("SELECT * FROM commodity WHERE merid=?"); 
			
			//对查询结果进行判断
			rs = db.executeQuery(sql, params);
			if(rs.next()){
				status=true;
				detail = new String("查询成功！");
			}else{
				detail = new String("查询失败！");
			}
			rs = db.executeQuery(sql, params);
			while(rs.next()){
//				out.println("comid:"+rs.getInt(1));
//				out.println("comname:"+rs.getString(2));
//				out.println("comprice:"+rs.getFloat(3));
//				out.println("comimage:"+rs.getString(4));
//				out.println("comtotal:"+rs.getInt(5));
//				out.println("comsort:"+rs.getString(6));
//				out.println("comdescribe:"+rs.getString(7));
				JSONObject temp = new JSONObject();
				temp.put("comid", rs.getInt(1));
				temp.put("comname",rs.getString(2));
				temp.put("comprice",rs.getFloat(3));
				temp.put("comtotal",rs.getInt(5));
				temp.put("comsort",rs.getString(6));
				js.put(temp);
			}
			json.put("status", status);
			json.put("detail", detail);
			json.put("message", js);
			out.println(json.toString());
			db.closeAll();
		} catch (ClassNotFoundException | InstantiationException
				| IllegalAccessException | SQLException | JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

}
