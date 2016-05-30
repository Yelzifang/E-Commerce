package k.service.customer;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import k.dao.DBO;

import org.json.JSONException;
import org.json.JSONObject;

import com.mysql.jdbc.Connection;

/**
 * Servlet implementation class CusCheck
 */
@WebServlet("/CusCheck")
public class CusCheck extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public CusCheck() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		HttpSession session = request.getSession();
		String cusid = (String)request.getParameter("cusid");
		
		System.out.println(cusid);
		String[] params = null;
		
		DBO db = new DBO();
		int n = 0;
		String sql = null;
		
		JSONObject json = new JSONObject();
		JSONObject js= new JSONObject();
		Boolean status = false;
		String detail = null;
		try{
			Connection conn = (Connection) db.getConn();
			if(conn==null){
				System.out.println("连接成功！");
			}else{
				if(cusid.equals("all")){
					params = new String[]{};
					sql = new String("UPDATE customer SET cuscheck='true'");
				}else{
					params = new String[]{cusid};
					sql = new String("UPDATE customer SET cuscheck='true' WHERE cusid=?");
				}
				n = db.executeUpdate(sql, params);
			}
			if(n==0){
				System.out.println("审核失败！");
				detail = new String("审核失败！");
			}else{
				System.out.println("审核成功！");
				status = true;
				detail = new String("审核成功！");
			}
			
			json.put("status", status);
			json.put("detail", detail);
			json.put("message", js);
			out.println(json.toString());
			db.closeAll();
		}catch(ClassNotFoundException | InstantiationException
				| IllegalAccessException | SQLException | JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
	
		}
	}

}
